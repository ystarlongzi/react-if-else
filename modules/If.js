var React = require('react');

/**
 * If Component for conditionally rendering child components.
 * Use <Else/> to specify failed condition rendering
 */
var If = React.createClass({
  render: function () {
    var cond = this.props.cond;
    var output;
    if (Array.isArray(this.props.children)) {
      output = this.props.children.reduce(function (agg, inp) {
        // render children before else if condition is true
        // otherwise, the opposite should happen
        if (cond && !agg.elseFound) {
          agg.children.push(inp);
        } else if (!cond && agg.elseFound) {
          agg.children.push(inp);
        }
        // if we find <Else/> handle it appropriately
        if (inp.hasOwnProperty('type') && inp.type.displayName === 'Else') {
          // only set the classname if this is false
          if (!cond) {
            agg.className = inp.props.className;
          }
          // mark that we have reached else
          agg.elseFound = true;
        }
        return agg;
      }, {
        // set the default classname to be used
        className: this.props.className,
        children: [],
        elseFound: false
      });
    } else {
      output = this.props.children;
    }
    return (
      <div className={output.className}>
        {output.children}
      </div>
    );
  }
});

module.exports = If;