import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Provider } from "react-redux";
import Login from '../Components/Login.jsx';
import configureMockStore from "redux-mock-store";
import axios from 'axios';

const modifiedState = {
  userName: "Mani",
  password: "Mani@1234"
}
const initialState = {
  userName: "Mani",
  password: "Mani@1234"
}
const mockStore = configureMockStore();
//const store = mockStore({});
const functions = {
  dispatch: jest.fn(),
  getsUsersList: jest.fn()
}

let getUsers = jest.fn();

beforeAll(() => {
  Login.getsUsersList = jest.fn();
});

const error = "Error from axios";
const data = [{username: "Mani", password: "Mani@1234"}];

jest.mock("axios");


describe(
  'Login', 
  () => {
    axios.get.mockResolvedValue({ data });
    const store = mockStore(initialState);
    const login = mount(
        <Provider store = {store}>
          <Login router={[]} getsUsersList={getUsers}/>    
        </Provider>
      );
    it(
      'Renders Login button',
      () => {
        // const data = {};
        // axios.get.mockImplementation(('http://localhost:7000/users') => { return Promise.resolve(data)});
        // axios.get.mockResolvedValue({ data });
        expect(login.find('input#login').exists()).toBeTruthy();
      }
    )
    it(
      'Login button click',
      () => {
        // axios.get.mockImplementation(() => Promise.resolve(data));
        // axios.get.mockResolvedValue({ data });
        login.find('input#login').simulate('click');
        expect(login.find('#usrname').hasClass('invalid')).toBeTruthy();
      }
    )
    it(
      'Error from axios',
      () => {
        const event = {
          target : { value: "Mani"}
        }
        // axios.get.mockImplementation(() => Promise.resolve(data));
        // axios.get.mockRejectedValue({data});
        login.find('input#password').simulate('change',event);
      }
    )
    it(
      'Password On change',
      () => {
        const event = {
          target : { value: "Mani"}
        }
        // axios.get.mockImplementation(() => Promise.resolve(data));
        // axios.get.mockResolvedValue({ data });
        login.find('input#password').simulate('change',event);
      }
    )
    it(
      'Valid credentials',
      () => {
        const nameEvent = {
          target : { value: "Mani"}
        }
        const PasswordEvent = {
          target : { value: "Mani@1234"}
        }
        // axios.get.mockImplementation(() => Promise.resolve(data));
        // axios.get.mockResolvedValue({ data });
        login.find('input#username').simulate('change',nameEvent);
        login.find('input#password').simulate('change',PasswordEvent);
        login.find('input#login').simulate('click');
        expect(login.find('#usrname').hasClass('valid')).toBeTruthy();
      }
    )
    it(
      'Invalid password',
      () => {
        const nameEvent = {
          target : { value: "Mani"}
        }
        const PasswordEvent = {
          target : { value: "Mani@123"}
        }
        // axios.get.mockImplementation(() => Promise.resolve(data));
        // axios.get.mockResolvedValue({ data });
        login.find('input#username').simulate('change',nameEvent);
        login.find('input#password').simulate('change',PasswordEvent);
        login.find('input#login').simulate('click');
        expect(login.find('#usrname').hasClass('valid')).toBeTruthy();
      }
    )
    it(
      'Invalid username',
      () => {
        const nameEvent = {
          target : { value: "Mani1234"}
        }
        const PasswordEvent = {
          target : { value: "Mani@1234"}
        }
        // axios.get.mockImplementation(() => Promise.resolve(data));
        // axios.get.mockResolvedValue({ data });
        login.find('input#username').simulate('change',nameEvent);
        login.find('input#password').simulate('change',PasswordEvent);
        login.find('input#login').simulate('click');
        expect(login.find('#usrname').hasClass('valid')).toBeTruthy();
      }
    )
  }
)

it(
  'Error from axios',
  () => {
    axios.get.mockRejectedValue({ error });
    const store = mockStore(initialState);
    const login = mount(
        <Provider store = {store}>
          <Login router={[]}/>    
        </Provider>
      );
    expect(axios.get).toHaveBeenCalled();
  }
)