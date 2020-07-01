import { CSSProperties, StyleSheet } from 'aphrodite/no-important';
import { rem } from '../../../../../styles/mixins';

export const rootHeight = rem(100);

export const component = StyleSheet.create({
  root: {
    width: '100%',
    height: rootHeight,
    padding: `0 ${rem(40)}`,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #f8f8f8'
  } as CSSProperties
});

export const input = StyleSheet.create({
  root: {
    borderRadius: rem(35),
    background: '#f4f4f4',
    padding: `${rem(16)} 0 ${rem(16)} ${rem(30)}`
  } as CSSProperties,
  body: {
    fontSize: rem(26),
    color: '#323232',
    paddingLeft: rem(18),
    width: '100%',
    background: 'transparent !important'
  } as CSSProperties,
  searchSvg: {
    width: rem(26),
    height: rem(26),
    fill: '#aaaaaa'
  } as CSSProperties,
  clearBox: {
    width: rem(94),
    height: rem(40)
  },
  clearSvg: {
    width: rem(32),
    height: rem(32),
    fill: '#cdcdcd'
  } as CSSProperties
});

export const submit = StyleSheet.create({
  root: {
    paddingLeft: rem(18),
    fontSize: rem(30),
    color: '#666666'
  } as CSSProperties
});