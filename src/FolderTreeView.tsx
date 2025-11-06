import { useState } from 'react';
import './FolderTreeView.css';

export interface TreeNode {
  name: string;
  type: 'folder' | 'item';
  children?: TreeNode[];
}

interface FolderTreeViewProps {
  data: TreeNode[];
  onItemClick?: (node: TreeNode, path: string[]) => void;
  defaultExpanded?: boolean;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  path: string[];
  onItemClick?: (node: TreeNode, path: string[]) => void;
  defaultExpanded?: boolean;
}

const TreeNodeItem = ({ node, level, path, onItemClick, defaultExpanded = false }: TreeNodeItemProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === 'folder';

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder && hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleClick = () => {
    // If it's a folder with children, toggle expansion
    if (isFolder && hasChildren) {
      setIsExpanded(!isExpanded);
    }
    // Call the onItemClick callback if provided
    if (onItemClick) {
      onItemClick(node, path);
    }
  };

  return (
    <div className="tree-node">
      <div
        className={`tree-node-content ${isFolder ? 'folder' : 'item'}`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleClick}
      >
        {isFolder && (
          <span className="tree-node-toggle" onClick={handleToggle}>
            {hasChildren ? (
              <span className="tree-icon">{isExpanded ? '📂' : '📁'}</span>
            ) : (
              <span className="tree-icon">📁</span>
            )}
          </span>
        )}
        {!isFolder && <span className="tree-icon">📄</span>}
        <span className="tree-node-name">{node.name}</span>
      </div>
      {isFolder && hasChildren && isExpanded && (
        <div className="tree-node-children">
          {node.children!.map((child, index) => (
            <TreeNodeItem
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              path={[...path, child.name]}
              onItemClick={onItemClick}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderTreeView = ({ data, onItemClick, defaultExpanded = false }: FolderTreeViewProps) => {
  return (
    <div className="folder-tree-view">
      {data.map((node, index) => (
        <TreeNodeItem
          key={`${node.name}-${index}`}
          node={node}
          level={0}
          path={[node.name]}
          onItemClick={onItemClick}
          defaultExpanded={defaultExpanded}
        />
      ))}
    </div>
  );
};

export default FolderTreeView;

