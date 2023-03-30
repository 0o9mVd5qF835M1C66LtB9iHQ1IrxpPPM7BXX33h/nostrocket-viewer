import { useState, useEffect } from 'react';

function Tree() {
  const [messages, setMessages] = useState([]);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://example.com/socket');

    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);

      if (message.type === 'eose') {
        setTreeData(processMessages(messages));
      } else {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  function processMessages(messages) {
    // Process the messages and return the tree data
    // You may need to modify this function based on the structure of your messages
    return { id: 1, label: 'Root Node', children: [] };
  }

  if (!treeData) {
    // Render a loading state while waiting for treeData to be received
    return <div>Loading tree data...</div>;
  }

  function renderNode(node) {
    return (
      <div>
        <span>{node.label}</span>
        {node.children && (
          <ul>
            {node.children.map(child => (
              <li key={child.id}>{renderNode(child)}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return <div>{renderNode(treeData)}</div>;
}
