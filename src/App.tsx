import './App.css'
// import MarkdownEditor from './MarkdownEditor'
// import DisplayMD from './DisplayMD'
// import {  ReactFlowProvider } from '@xyflow/react';
// import { MindMap } from "./MindMap"
// import { Map } from "./Map"
// import FertileCrescent from './Map2'
import FolderTreeView from './FolderTreeView'
import type { TreeNode } from './FolderTreeView'

function App() {
  // Example folder tree data
  const folderTreeData: TreeNode[] = [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'Button.tsx', type: 'item' },
            { name: 'Input.tsx', type: 'item' },
            { name: 'Modal.tsx', type: 'item' },
            { name: 'Card.tsx', type: 'item' },
            { name: 'Header.tsx', type: 'item' },
            { name: 'Footer.tsx', type: 'item' },
            { name: 'Sidebar.tsx', type: 'item' },
            {
              name: 'forms',
              type: 'folder',
              children: [
                { name: 'ContactForm.tsx', type: 'item' },
                { name: 'LoginForm.tsx', type: 'item' },
                { name: 'SignupForm.tsx', type: 'item' },
              ],
            },
          ],
        },
        {
          name: 'utils',
          type: 'folder',
          children: [
            { name: 'helpers.ts', type: 'item' },
            { name: 'constants.ts', type: 'item' },
            { name: 'formatters.ts', type: 'item' },
            { name: 'validators.ts', type: 'item' },
            { name: 'api.ts', type: 'item' },
          ],
        },
        { name: 'App.tsx', type: 'item' },
        { name: 'main.tsx', type: 'item' },
      ],
    },
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'item' },
        { name: 'favicon.ico', type: 'item' },
        { name: 'robots.txt', type: 'item' },
        { name: 'manifest.json', type: 'item' },
      ],
    },
    {
      name: 'package.json',
      type: 'item',
    },
    {
      name: 'README.md',
      type: 'item',
    },
  ];

  const handleItemClick = (node: TreeNode, path: string[]) => {
    console.log('Clicked:', node.name, 'Path:', path.join('/'));
  };


  return (
    <>
      <div style={{ padding: '40px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Folder Tree View</h2>
          <FolderTreeView 
            data={folderTreeData} 
            onItemClick={handleItemClick}
            defaultExpanded={false}
          />
        </div>
      </div>
      {/* <FertileCrescent /> */}
      {/* <Map /> */}
      {/* <MindMap />
      <MarkdownEditor />
      <div style={{ marginTop: '40px', padding: '20px', maxWidth: '1400px', margin: '40px auto' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Markdown Display Component</h1>
        <DisplayMD content={exampleContent} />
      </div> */}
    </>
  )
}

export default App
