#!/usr/bin/env -S deno run
import { readLines } from "https://deno.land/std@0.110.0/io/mod.ts";
import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";

type Lookup = {
  identifier: string;
  lines: string[];
  instances: number;
  isBlock: boolean;
}
class LookupCapture {
  constructor(
    private prefix: string,
    public lookup: Lookup,
  ) {}
  offer(line: string) {
    if (!line.startsWith(this.prefix+'  ')) {
      if (line === `${this.prefix}\}`) {
        this.lookup.isBlock = true;
        return true;
      }
      return false;
    }
    this.lookup.lines.push(line.slice(this.prefix.length+2));
    return true;
  }
}
class LookupCheck {
  constructor(
    private prefix: string,
    public lookup: Lookup,
  ) {}
  idx = 0;
  ignoreNext = 0;
  offer(line: string) {
    if (!line.startsWith(this.prefix+'  ')) {
      if (line === `${this.prefix}\}`) {
        assertEquals(this.lookup.isBlock, true);
        return true;
      }
      assertEquals(this.idx, this.lookup.lines.length);
      return false;
    }
    if (this.ignoreNext > 0) {
      this.ignoreNext--;
      return true;
    }
    const actual = line.slice(this.prefix.length+2);
    const expected = this.lookup.lines[this.idx++];
    if (actual !== expected && this.lookup.identifier === 'mentionLookup') {
      if (this.idx === 40 || this.idx === 30 || this.idx === 32) {
        this.ignoreNext = 3;
        return true;
      }
    }
    assertEquals(actual, expected);//, `${this.lookup.identifier} ${this.idx}`);
    return true;
  }
}
function beginLookup(prefix: string, key: string) {
  const existing = lookups.get(key);
  if (existing) {
    existing.instances++;
    return new LookupCheck(prefix, existing);
  }

  const lookup: Lookup = {
    identifier: `${key.replace(/_[a-z]/g, x => x[1].toUpperCase())}Lookup`,
    lines: [],
    instances: 1,
    isBlock: false,
  };
  lookups.set(key, lookup);
  return new LookupCapture(prefix, lookup);
}

const lookups = new Map<string, Lookup>();
const lookupKeys = /^( +)(emoji|language|function|format|color|mention|bot|image|video|pdf|file|audio)\??:( {)?$/;
const queryLookupKeys = /^( +)(title|text|rich_text|url|email|phone|phone_number|number|date|people|select|multi_select|relation|created_time|last_edited_time):$/;
let inLookup: LookupCapture | LookupCheck | null = null;
let firstMention = true;

const selectOrAnnotationRegexp = /^ +(select|multi_select|annotation)/;
let selectOrAnnotation = ['', ''];
let thisType = '';
for await (let line of readLines(Deno.stdin)) {

  if (inLookup) {
    if (inLookup.offer(line)) {
      continue;
    } else {
      inLookup = null;
    }
  }

  selectOrAnnotation = line.match(selectOrAnnotationRegexp) || selectOrAnnotation;

  const isQueryType = thisType === 'QueryDatabaseBodyParameters';
  const match = line.match(isQueryType ? queryLookupKeys : lookupKeys);
  if (match) {
    let groupName = match[2];
    if (groupName === 'color') {
      if (selectOrAnnotation[1] === 'annotation') {
        groupName = `annotationColor`;
      } else {
        groupName = `selectColor`;
      }
    }
    if (groupName === 'mention' && firstMention) {
      firstMention = false;
      groupName = '';
    }
    if (['image','video','pdf','file','audio'].includes(groupName)) {
      if (line.endsWith(' {') && thisType !== 'UpdateBlockBodyParameters') {
        groupName = `mediaBlock`;
      } else {
        groupName = ``;
      }
    }
    if (isQueryType) {
      if (['title','text','rich_text','url','email','phone','phone_number'].includes(groupName)) {
        groupName = 'stringQuery';
      }
      else if (groupName.endsWith('_time')) {
        groupName = 'dateQuery';
      }
      else groupName += 'Query';
    }
    if (groupName) {
      line = line.replace(/ {$/, '');
      inLookup = beginLookup(match[1], groupName);
      line = `${line} ${inLookup.lookup.identifier}`;
    }
  }

  if (line.startsWith('type ')) {
    line = `export ${line}`;
  }
  if (line.startsWith('export type ')) {
    thisType = line.split(' ')[2];
  }
  console.log(line);
}
console.log('\n');

for (const lookup of lookups.values()) {
  if (lookup.isBlock) {
    console.log(`export type ${lookup.identifier} = {`);
    console.log('  '+lookup.lines.join('\n  '));
    console.log('}\n');
  } else {
    console.log(`export type ${lookup.identifier} =`);
    console.log(lookup.lines.join('\n'));
    console.log('');
  }
}
