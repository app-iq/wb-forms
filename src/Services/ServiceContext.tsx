import React from 'react';
import {ServiceFactory} from './ServiceFactory/ServiceFactory';

export const ServiceContext = React.createContext<ServiceFactory | undefined>(undefined);
