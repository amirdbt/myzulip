import React, { useState, useEffect, createContext } from "react";

export const ChannelsContext = createContext();

export const ChannelsProvider = props => {
  const [channels, setChannels] = useState([
    {
      name: "bugs"
    },
    {
      name: "general"
    }
  ]);
  const addChannel = name => {
    const newChannel = [...channels, { name }];
    setChannels(newChannel);
  };

  const delChannel = index => {
    const newChannels = [...channels];
    newChannels.splice(index, 1);
    setChannels(newChannels);
  };

  const editChannel = (index, name) => {
    const newChannels = [...channels];
    newChannels.splice(index, 1, { name });
    setChannels(newChannels);
  };

  return (
    <ChannelsContext.Provider
      value={[channels, setChannels, addChannel, delChannel, editChannel]}
    >
      {props.children}
    </ChannelsContext.Provider>
  );
};
