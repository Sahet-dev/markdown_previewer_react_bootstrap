

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace("<a","<a target='_blank' ");
};

marked.setOptions({
  breaks: true,
  renderer: renderer,
  sanitize: true
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder
    };
    this.handleChange = this.handleChange.bind(this);
    this.converter = this.converter.bind(this);
  };
  
  handleChange(event) {
    this.setState({
      markdown: event.target.value
    })
  }
  
 converter() {
    let markedText = marked(this.state.markdown);
    return {__html : markedText};
  }
  
  render() {
    
    return (
  <div>
    <div id="container">
      <div className="row">
        <h1 id="title" className="col text-center text-white bg-success">Markdown Previewer</h1>
      </div> 
    
    <div className="row">
      <div className="col-6 rounded">
      
      <h2 className="text-center">Enter markdown </h2>
        <textarea value={this.state.markdown} onChange={this.handleChange} id="editor" name="editor" rows="30" className="col-10"/>
      </div>
      <div className="col-5  rounded">
        <h2 className="text-center">Previewer </h2>
        <div id="preview" dangerouslySetInnerHTML={this.converter()} />
        </div>
      </div>
    </div>
  </div>
    );
  }
};

const placeholder = `# Big title!

## Sub-heading...
### Etiam mattis lectus nisl, tincidunt

Heres some HTML code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function letsDebug(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return someFunction;
  }
}
\`\`\`

  **Bolded text**... whoa!
Or _italic_.
Or both **_Donec imperdiet id sem a aliquet!_**
 ~~Nullam eu imperdiet justo. Nam dignissim, odio ac posuere rhoncus~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
Left. | Center. | Right.

- And of course there are lists.
  - Proin vulputate neque vel.
     - Donec luctus viverra.
        - Vivamus semper nunc sed purus.


1. list item1
1. list item2
1. list item3

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(<App />, document.getElementById('root'))