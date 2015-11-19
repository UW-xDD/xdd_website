var colorUtil = (function() {
  var colors = _.shuffle(['#2D95BF', '#357BCB', '#955BA5', '#112F41', '#36424A', '#068587', '#4FB99F', '#F2B134', '#ED553B', '#DBC73D', '#C44E18', '#61B594', '#C40076', '#591C00', '#455C7B', '#16005A', '#57385C', '#363535', '#DB6E73', '#005D5C', '#FFBB6A', '#46906E', '#175882', '#A1B4BA', '#3392B8', '#4C4C4C', '#053462', '#62B072', '#2B1D2E', '#323657', '#076473', '#54B087', '#6D8C75', '#D9AD77', '#3F3E05', '#BF7B75', '#74DDB8', '#D99F59', '#D9782B', '#D9782B', '#5C474C', '#7D736A', '#54656B', '#742C4E', '#B04C2E']);

  var last5Colors = Array(5);

  function randomColor() {
    return colors[Math.floor(Math.random() * (colors.length - 1))];
  }

  return {
    colors: colors,
    random: function() {
      var color = randomColor();
      while (last5Colors.indexOf(color) > -1) {
        color = randomColor();
      }

      last5Colors.push(color);
      last5Colors.shift();

      return color;
    }
  }

})()
