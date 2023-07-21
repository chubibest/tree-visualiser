import React, { useEffect, useState } from 'react';
import {ReactDiagram} from 'gojs-react'
import { 
    GraphObject, Diagram, TreeLayout,
    Spot, Node, Binding, Shape, TextBlock,
    Link, Part, Brush, Size, TreeModel, ObjectData 
} from 'gojs';
import './index.css'

const Go = ({diagramNodes}: {diagramNodes: ObjectData[]}) => {
    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html

    const [myFullDiagram, setMyFullDiagram] = useState<Diagram | null>(null)
    const [myLocalDiagram, setMyLocalDiagram] = useState<Diagram | null>(null)
    // const [myNodeTemplate, setMyNodeTemplate] = useState<Node>()
    // const [myLinkTemplate, setMyLinkTemplate] = useState<Link>()

    const $ = GraphObject.make;  // for conciseness in defining templates

    const myNodeTemplate =
    $(Node, "Auto",
    { locationSpot: Spot.Center },
    new Binding("text", "key", Binding.toString),  // for sorting
    $(Shape, "Rectangle",
        new Binding("fill", "color"),
        { stroke: null }),
    $(TextBlock,
        { margin: 5 },
        new Binding("text", "key", k => "node" + k))
    );

    const myLinkTemplate =
        $(Link,
        { routing: Link.Normal, selectable: false },
        $(Shape,
            { strokeWidth: 1 })
    );


    function initFullDiagram () {
        function showLocalOnFullClick() {
            if(!myFullDiagram || !myLocalDiagram) return
            var node = myFullDiagram.selection.first();
            console.log('node', node)
            if (node !== null) {
                // make sure the selected node is in the viewport
                myFullDiagram.scrollToRect(node.actualBounds);
                // move the large gold part behind the selected node to highlight it
                highlighter.location = node.location;


                var model = new TreeModel();
                // add the selected node and its children and grandchildren to the local diagram
                // @ts-ignore
                var nearby = node.findTreeParts(3);  // three levels of the (sub)tree
                // add parent and grandparent
                // @ts-ignore
                var parent = node.findTreeParentNode();
                if (parent !== null) {
                nearby.add(parent);
                var grandparent = parent.findTreeParentNode();
                if (grandparent !== null) {
                    nearby.add(grandparent);
                }
                }
                // create the model using the samenodemyFullDiagram's model
                // @ts-ignore
                nearby.each(n => {
                if (n instanceof Node) model.addNodeData(n.data);
                });
                myLocalDiagram.model = model;
                // select the node at the diagram's focus
                var selectedLocal = myLocalDiagram.findPartForKey(node.data.key);
                if (selectedLocal !== null) selectedLocal.isSelected = true;
            }
        }

        const myFullDiagram = $(Diagram,   // each diagram refers to its DIV HTML element by id
            {
                initialAutoScale: Diagram.Uniform,  // automatically scale down to show whole tree
                contentAlignment: Spot.Center,  // center the tree in the viewport if it fits
                isReadOnly: true,  // don't allow user to change the diagram
                "animationManager.isEnabled": false,
                layout: $(TreeLayout,
                { angle: 90, sorting: TreeLayout.SortingAscending }),
                maxSelectionCount: 1,  // only one node may be selected at a time in each diagram
                // when the selection changes, update the myLocalDiagram view
                "ChangedSelection": showLocalOnFullClick
        })

        // Define a node template that is shared by both diagrams

        // myFullDiagram.nodeTemplate = myNodeTemplate as Node;
        // myFullDiagram.linkTemplate = myLinkTemplate as Link;
            // Create the tree model containing TOTAL nodes, with each node having a variable number of children
        myFullDiagram.model = new TreeModel(diagramNodes);
        // Create the full tree diagram
        console.log('myFullDiagram', myFullDiagram.model)
        // setupDiagram(undefined);

        const highlighter =
        $(Part, "Auto",
        {
            layerName: "Background",
            selectable: false,
            isInDocumentBounds: false,
            locationSpot: Spot.Center
        },
        $(Shape, "Ellipse",
            {
            fill: $(Brush, "Radial", { 0.0: "gold", 0.5: "gold", 1.0: "white" }),
            stroke: null,
            desiredSize: new Size(300, 300)
            })
        );
        // Create a part in the background of the full diagram to highlight the selected node
        myFullDiagram.add(highlighter);

        // Start by focusing the diagrams on the node at the top of the tree.
        // Wait until the tree has been laid out before selecting the root node.
        myFullDiagram.addDiagramListener("InitialLayoutCompleted", e => {
            var node0 = myFullDiagram.findPartForKey(0);
            if (node0 !== null) node0.isSelected = true;
            showLocalOnFullClick();
        });

        setMyFullDiagram(myFullDiagram)
    }
    
    function initLocalDiagram () {
        const myLocalDiagram =  // this is very similar to the full Diagram
            $(Diagram,
                {
                    initialAutoScale: Diagram.UniformToFill,
                    contentAlignment: Spot.Center,
                    isReadOnly: true,
                    "animationManager.isInitial": false,
                    layout: $(TreeLayout,
                    { angle: 90, sorting: TreeLayout.SortingDescending }),
                    "LayoutCompleted": e => {
                    var sel = e.diagram.selection.first();
                    if (sel !== null) myLocalDiagram.scrollToRect(sel.actualBounds);
                    },
                    maxSelectionCount: 1,
                    // when the selection changes, update the contents of the myLocalDiagram
                    "ChangedSelection": showLocalOnLocalClick
                }   
            )

    
        myLocalDiagram.nodeTemplate = myNodeTemplate as Node;
        
    
        // Define a basic link template, not selectable, shared by both diagrams
        myLocalDiagram.linkTemplate = myLinkTemplate as Link;
        
        var selectedLocal = myLocalDiagram.selection.first();
        function showLocalOnLocalClick() {
    
            if (selectedLocal !== null) {
               // there are two separate Nodes, one for each Diagram, but they share the same key value
                if(myFullDiagram) {
                    myFullDiagram.select(myFullDiagram.findPartForKey(selectedLocal.data.key));
                }
            }
        }
        setMyLocalDiagram(myLocalDiagram)

    }
    useEffect(() => {
 

        initFullDiagram()
        initLocalDiagram()
    }, [])




    // Make the corresponding node in the full diagram to that selected in the local diagram selected,
    // then call showLocalOnFullClick to update the local diagram.





    return (
        <>
        <div>
            {
                myFullDiagram ? 
                <ReactDiagram
                initDiagram={() => myFullDiagram}
                divClassName='fullDiagram'
                nodeDataArray={diagramNodes}
                skipsDiagramUpdate={false}
                /> :
                null
            }

            {
                myLocalDiagram ? 
                <ReactDiagram
                initDiagram={() => myLocalDiagram}
                divClassName='localDiagram'
                nodeDataArray={diagramNodes}
                skipsDiagramUpdate={false}
                /> :
                null
            }
        </div>
        </>
    );
};

export default Go;
