import { StyleSheet } from 'aphrodite/no-important';

const Animasearch: Record<string, React.CSSProperties> = {
  '0%': {
    transform: 'scale(1)',
    opacity: 1
  },
  '15%': {
    transform: 'scale(0.5)',
    opacity: 0
  },
  '50%': {
    transform: 'scale(0.5)',
    opacity: 0
  },
  '65%': {
    transform: 'scale(1)',
    opacity: 1
  }
};

const rotate: Record<string, React.CSSProperties> = {
  '0%': {
    transform: 'rotate(0)',
    clip: 'rect(0px, 35px, 35px, 0px)'
  },
  '50%': {
    clip: 'rect(0px, 40px, 40px, 0px)'
  },
  '100%': {
    transform: 'rotate(360deg)',
    clip: 'rect(0px, 35px, 35px, 0px)'
  }
};

const rotate2: Record<string, React.CSSProperties> = {
  '0%': {
    transform: 'rotate(0deg)',
    clip: 'rect(0px, 164px, 150px, 0px)'
  },
  '50%': {
    clip: 'rect(0px, 164px, 0px, 0px)',
    transform: 'rotate(360deg)'
  },
  '100%': {
    transform: 'rotate(720deg)',
    clip: 'rect(0px, 164px, 150px, 0px)'
  }
};

function hex() {
  const data = [
    [1, 0, 0],
    [2, 0, 42],
    [3, 36, 63],
    [4, 72, 42],
    [5, 72, 0],
    [6, 36, -21],
    [7, 36, 21]
  ];
  const style: Record<string, React.CSSProperties> = {};
  data.forEach((item) => {
    style[`hex_${item[0]}`] = {
      top: item[1],
      left: item[2],
      transform: 'scale(1)',
      opacity: 1,
      animationName: Animasearch as any,
      animationDuration: '3s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      animationDelay: (3 / 14 * item[0]) + 's'
    };
  });

  return style;
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '160px',
    height: '160px',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    border: '2px solid #E3E4DC',
    ':before': {
      content: '""',
      width: '164px',
      height: '164px',
      position: 'absolute',
      border: '2px solid #898a86',
      borderRadius: '50%',
      top: '-2px',
      left: '-2px',
      boxSizing: 'border-box',
      clip: 'rect(0px, 35px, 35px, 0px)',
      zIndex: 10,
      animationName: rotate,
      animationDuration: '3s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    },
    ':after': {
      content: '""',
      width: '164px',
      height: '164px',
      position: 'absolute',
      border: '2px solid #c1bebb',
      borderRadius: '50%',
      top: '-2px',
      left: '-2px',
      boxSizing: 'border-box',
      clip: 'rect(0px, 164px, 150px, 0px)',
      zIndex: 9,
      animationName: rotate2,
      animationDuration: '3s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    }
  },
  container: {
    position: 'relative',
    top: '33px',
    left: '41px',
    borderRadius: '50%'
  },
  hexagon: {
    position: 'absolute',
    width: '40px',
    height: '23px',
    backgroundColor: '#556C82',
    ':before': {
      content: '""',
      position: 'absolute',
      top: '-11px',
      left: 0,
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderBottom: '11.5px solid #556C82'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      top: '23px',
      left: 0,
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderTop: '11.5px solid #556C82'
    }
  },
  ...hex()
});

export default styles;