// Copyright (c) 2023 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'

// Utils
import {
  getLocale
} from '../../../../../../../common/locale'

import {
  useGetSelectedChainQuery
} from '../../../../../../common/slices/api.slice'

// Types
import { RefreshBlockchainStateParams } from '../../../constants/types'

// Components
import { Header } from '../header/header'

// Styled Components
import {
  Background,
  Container,
  PrivacyButton,
  Wrapper
} from './swap-container.style'

interface Props {
  children?: React.ReactNode
  showPrivacyModal: () => void
  refreshBlockchainState: (
    overrides: Partial<RefreshBlockchainStateParams>
  ) => Promise<void>
}

export const SwapContainer = (props: Props) => {
  const { children, showPrivacyModal, refreshBlockchainState } = props

  // Queries
  const { data: selectedNetwork } = useGetSelectedChainQuery()

  // State
  const [backgroundHeight, setBackgroundHeight] = React.useState<number>(0)
  const [backgroundOpacity, setBackgroundOpacity] = React.useState<number>(0.3)

  // Refs
  const ref = React.createRef<HTMLInputElement>()

  // Effects
  React.useEffect(() => {
    // Keeps track of the Swap Containers Height to update
    // the network backgrounds height.
    setBackgroundHeight(ref?.current?.clientHeight ?? 0)
  }, [ref])

  React.useEffect(() => {
    // Changes network background opacity to 0.6 after changing networks
    setBackgroundOpacity(0.6)
    // Changes network background opacity back to 0.3 after 1 second
    setTimeout(() => setBackgroundOpacity(0.3), 1000)
  }, [selectedNetwork])

  return (
    <Wrapper>
      <Header
        refreshBlockchainState={refreshBlockchainState}
      />
      <Container ref={ref}>{children}</Container>
      <PrivacyButton
        onClick={showPrivacyModal}
      >
        {getLocale('braveSwapPrivacyPolicy')}
      </PrivacyButton>
      <Background
        height={backgroundHeight}
        network={selectedNetwork?.chainId ?? ''}
        backgroundOpacity={backgroundOpacity}
      />
    </Wrapper>
  )
}
