import React from 'react';
import { Col } from '../DataTable/Col';
import { Row } from '../DataTable/Row';

export const TableRowLoading = () => {
    
    const loadingP = 'leading-relaxed rounded animate-pulse bg-indigo-300';
    return (
        <>
        <Row className="bg-white shadow rounded whitespace-nowrap py-6 px-6 hover:bg-blue-100">
            <Col className="w-3/12 flex flex-col my-auto">
                <p className={`${loadingP} w-4/12`}>&nbsp;</p>
                <p className={`${loadingP} w-8/12`}>&nbsp;</p>
            </Col>
            <Col className="w-7/12 flex flex-col my-auto">
                <p className={`${loadingP} w-10/12`}>&nbsp;</p>
            </Col>
            <Col className="w-2/12 flex flex-col my-auto">
                <p className={`${loadingP} w-10/12`}>&nbsp;</p>
            </Col>
        </Row>
        </>
    );
}