import React from 'react';
import './App.css';

const marked = require('marked');

const initialMarkdown =`
### Headers

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

### List

- item one
- item two
- item three

### Links

[FreeCodeCamp](https://learn.freecodecamp.org)

[Google](https://google.com 'Most Popular Search engine')


### Text Decorations

*italic*

**bold**

***bold and italic***

### Images

![alt text](https://cdn.pixabay.com/photo/2018/04/20/17/18/cat-3336579__340.jpg 'Cute Cat')

### Blockquote

> Honesty is the best policy.

### Code

\`npm install create-react-app -g\`

\`\`\`
  function addTwoNum(a,b) {
    return(a + b);
}
\`\`\`
`

var renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
  return `<a href=${href} target="_blank">${text}</a>`
}
marked.setOptions({
  renderer,
  breaks: true
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markdown: initialMarkdown
    }
    this.handleChange = this.handleChange.bind(this);
    this.clearText = this.clearText.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    })
  }
  clearText() {
    this.setState({
      markdown: ""
    })
  }
  
  render() {
    return(
    <div>
      <h1 id="heading">Markdown Previewer</h1><hr />
        <div className="container">
        <h2 id="edit">Editor</h2>
        <h2 id="pre">Previewer</h2>
        </div> 
        <div className="container">
          <div className="left-area">
            <textarea id="editor" value={this.state.markdown} onChange={this.handleChange}/>
            <button onClick={this.clearText}>Clear Text</button>
            </div>
          <div className="right-area">
            <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}} />
          </div>
        </div>
    </div>
    )
  }
}

export default App;
