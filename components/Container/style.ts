import * as React from 'react';
import { create, css } from '../../styles/css-in-js';

function createOrder() {
  const order: Record<string, React.CSSProperties> = {};
  for (let i = 0; i < 10; i++) {
    order[`order-${i}`] = {
      order: i
    };
  }

  return order;
}

function createFlex() {
  const flex: Record<string, React.CSSProperties> = {};
  for (let i = 0; i < 10; i++) {
    flex[`flex-${i}`] = {
      flex: i,
      flexGrow: i
    };
  }

  return flex;
}

const styles = create({
  flex: css({
    display: 'flex'
  }),
  'flexDirection-row': css({
    flexDirection: 'row'
  }),
  'flexDirection-row-reverse': css({
    flexDirection: 'row-reverse'
  }),
  'flexDirection-column-reverse': css({
    flexDirection: 'column-reverse'
  }),
  'flexDirection-column': css({
    flexDirection: 'column'
  }),
  'flexWrap-nowrap': css({
    flexWrap: 'nowrap'
  }),
  'flexWrap-wrap': css({
    flexWrap: 'wrap'
  }),
  'flexWrap-wrap-reverse': css({
    flexWrap: 'wrap-reverse'
  }),
  'justifyContent-flex-start': css({
    justifyContent: 'flex-start'
  }),
  'justifyContent-flex-end': css({
    justifyContent: 'flex-end'
  }),
  'justifyContent-center': css({
    justifyContent: 'center'
  }),
  'justifyContent-space-between': css({
    justifyContent: 'space-between'
  }),
  'justifyContent-space-around': css({
    justifyContent: 'space-around'
  }),
  'alignItems-flex-start': css({
    alignItems: 'flex-start'
  }),
  'alignItems-flex-end': css({
    alignItems: 'flex-end'
  }),
  'alignItems-center': css({
    alignItems: 'center'
  }),
  'alignItems-baseline': css({
    alignItems: 'baseline'
  }),
  'alignItems-stretch': ({
    alignItems: 'stretch'
  }),
  'alignContent-flex-start': ({
    alignContent: 'flex-start'
  }),
  'alignContent-flex-end': ({
    alignContent: 'flex-end'
  }),
  'alignContent-space-between': ({
    alignContent: 'space-between'
  }),
  'alignContent-center': ({
    alignContent: 'center'
  }),
  'alignContent-space-around': ({
    alignContent: 'space-around'
  }),
  'alignContent-stretch': ({
    alignContent: 'stretch'
  }),
  'alignSelf-auto': ({
    alignSelf: 'auto'
  }),
  'alignSelf-flex-start': ({
    alignSelf: 'flex-start'
  }),
  'alignSelf-flex-end': ({
    alignSelf: 'flex-end'
  }),
  'alignSelf-center': ({
    alignSelf: 'center'
  }),
  'alignSelf-baseline': ({
    alignSelf: 'baseline'
  }),
  'alignSelf-stretch': ({
    alignSelf: 'stretch'
  }),
  ...createOrder(),
  ...createFlex()
});

export default styles;