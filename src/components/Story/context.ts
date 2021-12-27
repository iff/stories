import * as React from "react";

export const Context = React.createContext<{ blobs: Array<any> }>({ blobs: [] });
