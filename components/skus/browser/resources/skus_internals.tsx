// Copyright (c) 2023 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import * as SkusInternalsMojo from 'gen/brave/components/skus/common/skus_internals.mojom.m.js'
import * as React from 'react'
import styled from 'styled-components'
import { render } from 'react-dom'
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const Container = styled.div`
  margin: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`

const API = SkusInternalsMojo.SkusInternals.getRemote()

function App() {
  const [skusState, setSkusState] = React.useState({})

  const resetSkusState = () => {
    API.resetSkusState()
    setSkusState({})
  }

  const getSkusState = () => {
    API.getSkusState().then((r: any) => {
      setSkusState(JSON.parse(r.response))
    })
  }

  return (
    <Container>
      <h2>SKUs internals</h2>
      <ButtonContainer>
        <button onClick={() => {
            if (window.confirm('Resetting SKUs state will count the next sign in for account.brave.com as a new device. If you do this more than once you may run out of devices/credentials. Are you sure you want to reset SKUs state?')) {
              resetSkusState()
            }
          }}>
          Reset SKUs state
        </button>
        <button onClick={getSkusState}>Fetch SKUs state</button>
      </ButtonContainer>
      <JsonView data={skusState} shouldInitiallyExpand={(level) => true} />
    </Container>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('root'))
})
