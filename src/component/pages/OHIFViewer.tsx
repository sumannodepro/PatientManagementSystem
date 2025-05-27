import React from 'react';
import { Viewer } from '@ohif/viewer';

const OHIFViewer: React.FC = () => {
    const config = {
        routerBasename: '/',
        showStudyList: true,
        dataSources: [
            {
                friendlyName: 'DICOMWeb',
                namespace: 'dicomweb',
                sourceName: 'default',
                configuration: {
                    name: 'DCM4CHEE',
                    wadoUriRoot: 'https://your-dicom-server/wado',
                    qidoRoot: 'https://your-dicom-server/qido',
                    wadoRoot: 'https://your-dicom-server/wado',
                    qidoSupportsIncludeField: true,
                    supportsReject: false,
                    staticWado: false,
                    singlepart: 'bulkdata,video',
                    supportsFuzzyMatching: true,
                    supportsWildcard: true,
                },
            },
        ],
    };

    return (
        <div style={{ height: '100vh' }}>
            <Viewer config={config} />
        </div>
    );
};

export default OHIFViewer;