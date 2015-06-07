import React from 'react/addons';
import { expect } from 'chai';

import BemMixin from '../src/BemMixin';

let { TestUtils } = React.addons;
let shallowRenderer = TestUtils.createRenderer();

const TestComponent = React.createClass({
  mixins: [BemMixin],
  render() {
    const states = { enabled: this.props.enabled, active: this.props.active },
          modifiers = { small: this.props.small };
    return (
      <div className={this.bemCx({ states: states, modifiers: modifiers })}>{this.props.children}</div>
    );
  }
});

describe('TestComponent with BemMixin should have the correct class name if rendered with', () => {

  it('\'bemBlock\'', () => {
    shallowRenderer.render(<TestComponent bemBlock="loginform"/>);
    expect(shallowRenderer.getRenderOutput().props.className).to.equal('loginform__TestComponent');
  });

  it('\'bemBlock\' and \'bemNamespace\'', () => {
    shallowRenderer.render(<TestComponent bemNamespace="homepage" bemBlock="loginform"/>);
    expect(shallowRenderer.getRenderOutput().props.className).to.equal('homepage-loginform__TestComponent');
  });

  it('\'bemBlock\' and states', () => {
    shallowRenderer.render(<TestComponent bemBlock="loginform" enabled={true} active={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('loginform__TestComponent loginform__TestComponent--is-enabled loginform__TestComponent--is-active');

    shallowRenderer.render(<TestComponent bemBlock="loginform" enabled={true} active={false}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('loginform__TestComponent loginform__TestComponent--is-enabled');

    shallowRenderer.render(<TestComponent bemBlock="loginform" enabled={false} active={false}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('loginform__TestComponent');
  });

  it('\'bemBlock\', \'bemNamespace\' and states', () => {
    shallowRenderer.render(<TestComponent bemNamespace="homepage" bemBlock="loginform" enabled={true} active={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('homepage-loginform__TestComponent homepage-loginform__TestComponent--is-enabled homepage-loginform__TestComponent--is-active');

    shallowRenderer.render(<TestComponent bemNamespace="homepage" bemBlock="loginform" enabled={true} active={false}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('homepage-loginform__TestComponent homepage-loginform__TestComponent--is-enabled');

    shallowRenderer.render(<TestComponent bemNamespace="homepage" bemBlock="loginform" enabled={false} active={false}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('homepage-loginform__TestComponent');
  });

  it('\'bemBlock\', states and modifiers', () => {
    shallowRenderer.render(<TestComponent bemBlock="loginform" enabled={true} active={true} small={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('loginform__TestComponent loginform__TestComponent--is-enabled ' +
                                    'loginform__TestComponent--is-active loginform__TestComponent--small ' +
                                    'loginform__TestComponent--small--is-enabled loginform__TestComponent--small--is-active');

    shallowRenderer.render(<TestComponent bemBlock="loginform" enabled={true} active={false} small={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('loginform__TestComponent loginform__TestComponent--is-enabled ' +
                                    'loginform__TestComponent--small loginform__TestComponent--small--is-enabled');

    shallowRenderer.render(<TestComponent bemBlock="loginform" enabled={false} active={false} small={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('loginform__TestComponent loginform__TestComponent--small');

    shallowRenderer.render(<TestComponent bemBlock="loginform" enabled={false} active={false} small={false}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('loginform__TestComponent');
  });

  it('\'bemBlock\', \'bemNamespace\', states and modifiers', () => {
    shallowRenderer.render(<TestComponent bemNamespace="homepage" bemBlock="loginform" enabled={true} active={true} small={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('homepage-loginform__TestComponent homepage-loginform__TestComponent--is-enabled ' +
                                    'homepage-loginform__TestComponent--is-active ' +
                                    'homepage-loginform__TestComponent--small ' +
                                    'homepage-loginform__TestComponent--small--is-enabled ' +
                                    'homepage-loginform__TestComponent--small--is-active');

    shallowRenderer.render(<TestComponent bemNamespace="homepage" bemBlock="loginform" enabled={true} active={false} small={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('homepage-loginform__TestComponent homepage-loginform__TestComponent--is-enabled ' +
                                    'homepage-loginform__TestComponent--small homepage-loginform__TestComponent--small--is-enabled');

    shallowRenderer.render(<TestComponent bemNamespace="homepage"bemBlock="loginform" enabled={false} active={false} small={true}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('homepage-loginform__TestComponent homepage-loginform__TestComponent--small');

    shallowRenderer.render(<TestComponent bemNamespace="homepage" bemBlock="loginform" enabled={false} active={false} small={false}/>);
    expect(shallowRenderer.getRenderOutput().props.className)
                          .to.equal('homepage-loginform__TestComponent');
  });
});
