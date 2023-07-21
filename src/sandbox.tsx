import React from 'react';

const sandbox = () => {
    return (
        <>
            <nav id="navTop" className="w-full z-30 top-0 text-white bg-nwoods-primary">
                <div className="w-full container max-w-screen-lg mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between mt-0 py-2">
                <div className="md:pl-4">
                    <a className="text-white hover:text-white no-underline hover:no-underline
                    font-bold text-2xl lg:text-4xl rounded-lg hover:bg-nwoods-secondary " href="../">
                    <h1 className="my-0 p-1 ">GoJS</h1>
                    </a>
                </div>
                <button id="topnavButton" className="rounded-lg sm:hidden focus:outline-none focus:ring" aria-label="Navigation">
                    <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    <path id="topnavOpen" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    <path id="topnavClosed" className="hidden" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                </div>
                <hr className="border-b border-gray-600 opacity-50 my-0 py-0" />
            </nav>
            <div className="md:flex flex-col md:flex-row md:min-h-screen w-full max-w-screen-xl mx-auto">
                <div id="navSide" className="flex flex-col w-full md:w-48 text-gray-700 bg-white flex-shrink-0"></div>
                {/* <!-- * * * * * * * * * * * * * --> */}
                {/* <!-- Start of GoJS sample code --> */}
                
                <script src="../release/go.js"></script>
                <div id="allSampleContent" className="p-4 w-full">
                <script id="code">
                







            </script>

            <div id="sample">
            <div id="fullDiagram" style={{height: '250px', width: '100%', border: '1px solid black', margin: '2px'}}></div>
            <div id="localDiagram" style={{height: '350px', width: '100%', border: '1px solid black', margin: '2px'}}></div>
            <p>
            This sample includes two diagrams, the one on top showing a full tree and the one below
            focusing on a specific node in the tree and those nodes that are logically "near" it.
            When the selection changes in either diagram, the lower diagram changes its focus to the selected node.
            To show which node in the full tree is selected,
            a large gold highlighter part employing a radial <a>Brush</a> is placed in the background layer of the upper diagram behind the selected node.
            The Create New Tree button will randomly generate a new <a>TreeModel</a> to be used by the diagrams.
            </p>
            <p>
            Although it is not demonstrated in this sample,
            one could well use very simple templates for Nodes and for Links in the top Diagram.
            This would make the top Diagram more efficient to construct when there are very many more nodes.
            And one could use more detailed templates in the bottom Diagram,
            where there is more room to show information for each node.
            </p>
            </div>
                </div>
            </div>    
        </>
    );
};

export default sandbox;