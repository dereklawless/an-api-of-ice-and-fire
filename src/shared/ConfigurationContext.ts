import React from "react";

import Configuration from "./models/Configuration.interface";

export const ConfigurationContext: React.Context<Configuration> = React.createContext({} as Configuration);

export default ConfigurationContext;