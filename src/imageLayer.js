const imageLayer = (onAppend) => {
  let canvasWidthRatio = 0.0, canvasHeightRatio = 0.0;
  return {
    beginLayout: () => {
      console.log('beginLayout');
    },
    endLayout: () => {
      console.log('endLayout');
    },
    appendImage: (imageProps) => {
      console.log('appendImage', imageProps);

      console.log('multiplying width/left by: ', canvasWidthRatio);
      console.log('multiplying height/top by: ', canvasHeightRatio);
      const newHeight = imageProps.height * canvasHeightRatio;
      const appendProps = Object.assign({}, imageProps, {
        left: imageProps.left * canvasWidthRatio,
        width: imageProps.width * canvasWidthRatio,
        top: imageProps.top * canvasHeightRatio,
        height: newHeight,
      });
      if (onAppend) {
        onAppend(appendProps);
      }
    },
    setHeightRatio: (height1, height2) => {
      console.log('ratio', height1, height2);
      canvasHeightRatio = height1 / height2;
    },
    setWidthRatio: (width1, width2) => {
      console.log('ratio', width1, width2);
      canvasWidthRatio = width1 / width2;
    },
  }
};

export default imageLayer;
