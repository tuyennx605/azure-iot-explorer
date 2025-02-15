/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { getInitialDeviceEventsState } from '../state';
import { deviceEventsReducer } from '../reducers';
import { DeviceEventsStateContext } from './deviceEventsStateContext';
import { startEventsMonitoringAction, stopEventsMonitoringAction, clearMonitoringEventsAction, setDecoderInfoAction, setDefaultDecodeInfoAction } from '../actions';
import { EventMonitoringSaga } from '../saga';
import { useAsyncSagaReducer } from '../../../shared/hooks/useAsyncSagaReducer';
import { MonitorEventsParameters, SetDecoderInfoParameters } from '../../../api/parameters/deviceParameters';

export interface DeviceEventsInterface {
    clearEventsMonitoring(): void;
    setDecoderInfo(params: SetDecoderInfoParameters): void;
    setDefaultDecodeInfo(): void;
    startEventsMonitoring(params: MonitorEventsParameters): void;
    stopEventsMonitoring(): void;
}

export const DeviceEventsStateContextProvider: React.FC = props => {
    const [state, dispatch] = useAsyncSagaReducer(deviceEventsReducer, EventMonitoringSaga, getInitialDeviceEventsState());

    const deviceEventsApi: DeviceEventsInterface = {
        clearEventsMonitoring: () => dispatch(clearMonitoringEventsAction()),
        setDecoderInfo: (params: SetDecoderInfoParameters) => dispatch(setDecoderInfoAction.started(params)),
        setDefaultDecodeInfo: () => dispatch(setDefaultDecodeInfoAction()),
        startEventsMonitoring: (params: MonitorEventsParameters) => dispatch(startEventsMonitoringAction.started(params)),
        stopEventsMonitoring: () => dispatch(stopEventsMonitoringAction.started())
    };

    return (
        <DeviceEventsStateContext.Provider value={[state, deviceEventsApi]}>
            {props.children}
        </DeviceEventsStateContext.Provider>
    );
};
