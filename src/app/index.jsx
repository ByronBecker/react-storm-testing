
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Demo from './Demo.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <Demo/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('render-target')
)