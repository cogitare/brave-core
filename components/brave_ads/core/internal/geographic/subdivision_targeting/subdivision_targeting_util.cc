/* Copyright (c) 2023 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

#include "brave/components/brave_ads/core/internal/geographic/subdivision_targeting/subdivision_targeting_util.h"

#include "base/containers/contains.h"
#include "base/strings/string_piece.h"
#include "brave/components/brave_ads/core/supported_subdivisions.h"

namespace brave_ads {

bool DoesSupportCountryCode(const std::string& country_code) {
  return base::Contains(GetSupportedSubdivisions(), country_code);
}

bool DoesCountryCodeSupportSubdivision(const std::string& country_code,
                                       const std::string& subdivision) {
  const auto iter = GetSupportedSubdivisions().find(country_code);
  if (iter == GetSupportedSubdivisions().cend()) {
    return false;
  }

  const auto& [_, subdivisions] = *iter;

  return subdivisions.find(subdivision) != subdivisions.cend();
}

}  // namespace brave_ads
