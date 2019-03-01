// import * as React from 'react';
// import { appData, LifeCyclerCallback } from '../app/core';

// export const useEnter = (cb: LifeCyclerCallback) => {
//   React.useEffect(() => {
//     appData.enterRefs.push(cb);
//     console.log('useEnter')
//     return () => {
//       appData.enterRefs.pop();
//     };
//   }, []);
// };

// export const useLeave = (cb: LifeCyclerCallback) => {
//   React.useEffect(() => {
//     appData.enterRefs.push(cb);
//     console.log('useLeave')
//     return () => {
//       appData.enterRefs.pop();
//     };
//   }, []);
// };

// export const useActive = (cb: LifeCyclerCallback) => {
//   React.useEffect(() => {
//     appData.enterRefs.push(cb);
//     console.log('useActive')
//     return () => {
//       appData.enterRefs.pop();
//     };
//   }, []);
// };