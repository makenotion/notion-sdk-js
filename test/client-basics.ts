import test from 'ava';
import { Client } from '../src';

test('initialize client', t => {
  new Client({ auth: 'foo' });
  t.pass();
});
