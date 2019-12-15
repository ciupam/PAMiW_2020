import React from 'react'
import { shallow } from 'enzyme'
import MainHeader from './MainHeader'
import { findByTestAttr } from '../../../util/test'

describe('<MainHeader />', () => {
    let component;
    beforeEach(() => {
        component = shallow(<MainHeader />)
    })

    it('Should render without errors', () => {
        expect(findByTestAttr(component, 'AppBar').length).toBe(1)
    })
})