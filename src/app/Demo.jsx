import {
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DefaultPortModel,
	DiagramWidget
} from "storm-react-diagrams";
import * as React from "react";
import * as ReactDOM from "react-dom"

import "./srd.css";

export default class Demo extends React.Component {
    /*
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    */
    //1) setup the diagram engine

    render() {
    
        let engine = new DiagramEngine();
	    engine.registerNodeFactory(new DefaultNodeFactory());
	    engine.registerLinkFactory(new DefaultLinkFactory());

        //2) setup the diagram model
        let model = new DiagramModel();

        //3-A) create a default node
        let node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
        let port1 = node1.addPort(new DefaultPortModel(false, "out-1", "Out"));
        node1.x = 100;
        node1.y = 100;

        //3-B) create another default node
        var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
        var port2 = node2.addPort(new DefaultPortModel(true, "in-1", "IN"));
        node2.x = 400;
        node2.y = 100;

        //3-C) link the 2 nodes together
        var link1 = new LinkModel();
        link1.setSourcePort(port1);
        link1.setTargetPort(port2);

        //4) add the models to the root graph
        model.addNode(node1);
        model.addNode(node2);
        model.addLink(link1);

        //5) load model into engine
        engine.setDiagramModel(model);

	//6) render the diagram!
	    return (
            <DiagramWidget diagramEngine={engine} />
        );
    }
}



