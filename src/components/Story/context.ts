import * as React from "react";

interface Value {
  storyId: string;
  blobs: Array<any>;
}

export const Context = React.createContext<Value>({ storyId: "", blobs: [] });
