#!/usr/bin/env -S deno run
import { readLines } from "https://deno.land/std@0.110.0/io/mod.ts";
import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";

type Lookup = {
  identifier: string;
  lines: string[];
  instances: number;
}
class LookupCapture {
  constructor(
    private prefix: string,
    public lookup: Lookup,
  ) {}
  offer(line: string) {
    if (!line.startsWith(this.prefix)) return false;
    this.lookup.lines.push(line.slice(this.prefix.length));
    return true;
  }
}
class LookupCheck {
  constructor(
    private prefix: string,
    public lookup: Lookup,
  ) {}
  idx = 0;
  offer(line: string) {
    if (!line.startsWith(this.prefix)) {
      assertEquals(this.idx, this.lookup.lines.length);
      return false;
    }
    assertEquals(line.slice(this.prefix.length), this.lookup.lines[this.idx++]);
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
    identifier: `${key}Lookup`,
    lines: [],
    instances: 1,
  };
  lookups.set(key, lookup);
  return new LookupCapture(prefix, lookup);
}

const lookups = new Map<string, Lookup>();
const lookupKeys = /^( +)(emoji|language|function|format|color)\??:$/;
let inLookup: LookupCapture | LookupCheck | null = null;

const selectOrAnnotationRegexp = /^ +(select|multi_select|annotation)/;
let selectOrAnnotation = ['', ''];
for await (let line of readLines(Deno.stdin)) {

  if (inLookup) {
    if (inLookup.offer(line)) {
      continue;
    } else {
      inLookup = null;
    }
  }

  selectOrAnnotation = line.match(selectOrAnnotationRegexp) || selectOrAnnotation;

  const match = line.match(lookupKeys);
  if (match) {
    let groupName = match[2];
    if (groupName === 'color') {
      if (selectOrAnnotation[1] === 'annotation') {
        groupName = `annotationColor`;
      } else {
        groupName = `selectColor`;
      }
    }
    inLookup = beginLookup(match[1]+'  ', groupName);
    line = `${line} ${inLookup.lookup.identifier}`;
  }

  if (line.startsWith('type ')) {
    console.log(`export ${line}`)
  } else {
    console.log(line);
  }
}
console.log('\n');

for (const lookup of lookups.values()) {
  console.log(`export type ${lookup.identifier} =`);
  console.log(lookup.lines.join('\n'));
  console.log(';\n');
}
