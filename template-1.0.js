// template.js by zhsoft88 at 2016.12.8
// copyright (c) 2017 zhuatang.com

function Template(source) {
  function escaped(str) {
    var result = str,
        escapeList = [
      ['\\', '\\\\'],
      ['"', '\\"'],
      ['\n', '\\n']
    ];
    for (var i = 0, _len = escapeList.length; i < _len; i++) {
      result = ''.replace.apply(result, escapeList[i]);
    }
    return result;
  }
  var script = 'this.render = function(o){ var out="";',
      len = source.length,
      i = 0;
  while (i < len) {
    // skip to <@
    var startPos = source.indexOf('<@',i);
    startPos = (startPos === -1) ? len : startPos;
    var preStr = source.slice(i, startPos);
    if (preStr !== '') {
      script += 'out+="' + escaped(preStr) + '";';
    }
    i = startPos + 2;
    
    var isExpr = (source[i] === '=');
    if (isExpr) {
      i++;
    }
    
    // get until @>
    var endPos = source.indexOf('@>', i);
    endPos = (endPos === -1) ? len : endPos;
    var tplStr = source.slice(i, endPos);
    
    if (tplStr !== '') {
      script += isExpr ? 'out+=(' + tplStr + ');' : str;
    }
  }
  script += 'return out;}';
  window.eval(script);
}
