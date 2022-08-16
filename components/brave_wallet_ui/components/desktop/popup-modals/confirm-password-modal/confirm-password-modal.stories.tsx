// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import * as React from 'react'
import WalletPageStory from '../../../../stories/wrappers/wallet-page-story-wrapper'

import { ConfirmPasswordModal } from './confirm-password-modal'

export const _ConfirmPasswordModal = () => {
  return <WalletPageStory>
    <ConfirmPasswordModal
      title='Are you sure that you want to remove "MY ACCOUNT NAME HERE"?'
      onClose={() => alert('close')}
      onSuccess={() => alert('success')}
    />
  </WalletPageStory>
}

_ConfirmPasswordModal.story = {
  name: 'Confirm Password Modal'
}

export default _ConfirmPasswordModal
