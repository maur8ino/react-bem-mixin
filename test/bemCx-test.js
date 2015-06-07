import { expect } from 'chai';

import bemCx from '../src/bemCx';

describe('bemCx', () => {
  describe('should generate', () => {
    it('an empty class name', () => {
      expect(bemCx()).to.equal('');
    });

    it('class name with block', () => {
      expect(bemCx({
        block: 'loginform'
      })).to.equal('loginform');
    });

    it('class name with block and element', () => {
      expect(bemCx({
        block: 'loginform',
        element: 'username'
      })).to.equal('loginform__username');
    });

    it('class name with namespace, block and element', () => {
      expect(bemCx({
        namespace: 'homepage',
        block: 'loginform',
        element: 'username'
      })).to.equal('homepage-loginform__username');
    });

    it('class name with block, element and states', () => {
      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {
          enabled: true,
          active: true
        }
      })).to.equal('loginform__username loginform__username--is-enabled loginform__username--is-active');

      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {
          enabled: true,
          active: false
        }
      })).to.equal('loginform__username loginform__username--is-enabled');

      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {
          enabled: false,
          active: false
        }
      })).to.equal('loginform__username');

      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {}
      })).to.equal('loginform__username');
    });

    it('class name with block, element and modifiers', () => {
      expect(bemCx({
        block: 'loginform',
        element: 'username',
        modifiers: {
          small: true
        }
      })).to.equal('loginform__username loginform__username--small');

      expect(bemCx({
        block: 'loginform',
        element: 'username',
        modifiers: {
          small: false
        }
      })).to.equal('loginform__username');
    });

    it('class name with block, element, states and modifiers', () => {
      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {
          enabled: true,
          active: true
        },
        modifiers: {
          small: true
        }
      })).to.equal('loginform__username loginform__username--is-enabled loginform__username--is-active ' +
                   'loginform__username--small loginform__username--small--is-enabled loginform__username--small--is-active');

      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {
          enabled: true,
          active: false
        },
        modifiers: {
          small: true
        }
      })).to.equal('loginform__username loginform__username--is-enabled ' +
                   'loginform__username--small loginform__username--small--is-enabled');

      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {
          enabled: true,
          active: false
        },
        modifiers: {
          small: false
        }
      })).to.equal('loginform__username loginform__username--is-enabled');

      expect(bemCx({
        block: 'loginform',
        element: 'username',
        states: {
          enabled: false,
          active: false
        },
        modifiers: {
          small: false
        }
      })).to.equal('loginform__username');
    });
  });
});
