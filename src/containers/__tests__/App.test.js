import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import * as actions from '../../actions';

import { App } from '../App';
import Picker from '../../components/Picker';

describe('App', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            isFetching: false,
            dispatch: jest.fn(),
            selectedSubreddit: 'reactjs',
            posts: []
        }

        const wrapper = shallow(<App {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('sets the selectedSubreddit prop as the value prop on Picker component', () => {
        const props = {
            isFetching: false,
            dispatch: jest.fn(),
            selectedSubreddit: 'reactjs',
            posts: []
        }
        const wrapper = shallow(<App {...props} />);        
        const PickerComponent = wrapper.find(Picker);
        expect(PickerComponent.props().value).toBe(props.selectedSubreddit);
    });

    it('renders the refresh button when the isFetching prop is false', () => {
        const props = {
            isFetching: false,
            dispatch: jest.fn(),
            selectedSubreddit: 'reactjs',
            posts: []
        }
        const wrapper = shallow(<App {...props} />);
        expect(wrapper.find('button').length).toBe(1);
    });

    it('handleRefreshClick dispatches the correct actions', () => {
        const props = {
            isFetching: false,
            dispatch: jest.fn(),
            selectedSubreddit: 'reactjs',
            posts: []
        }

        const mockEvent = {
            preventDefault: jest.fn()
        }

        actions.invalidateSubreddit = jest.fn();
        actions.fetchPostsIfNeeded = jest.fn();

        const wrapper = shallow(<App {...props} />);

        wrapper.instance().handleRefreshClick(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(props.dispatch.mock.calls.length).toBe(3);
        expect(actions.invalidateSubreddit.mock.calls.length).toBe(1);
        expect(actions.fetchPostsIfNeeded.mock.calls.length).toBe(2);
    })
})

