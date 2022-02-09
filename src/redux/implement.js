import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <span style={{ paddingLeft: 30, paddingRight: 30, backgroundColor: '#ccc', color: '#000' }}>{this.props.count.v}</span>
                <span style={{ paddingLeft: 30, paddingRight: 30, backgroundColor: '#ccc', color: '#000' }}></span>

                <div style={{ display: 'flex', padding: 20 }}>
                    <button
                        style={{ marginRight: 10 }}
                        onClick={(e) => {
                            dispatch({ type: 'INC' });
                        }}
                    >
                        Increment
                    </button>
                    <button
                        onClick={(e) => {
                            dispatch({ type: 'DEC' });
                        }}
                    >
                        Decrement
                    </button>
                    <button>
                        <span>Login</span>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.counter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
