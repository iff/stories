import * as React from "react";

interface Value {
  blobs: Array<any>;
}

export const Context = React.createContext<Value>({ blobs: [] });
