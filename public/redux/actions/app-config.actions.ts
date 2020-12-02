/*
 * Wazuh app - App Config Actions
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import { ResolverAction } from '../types';

export const setAppConfigIsLoading = (): ResolverAction => {
  return {
    type: 'APP_CONFIG_SET_IS_LOADING',
    payload: null
  };
}

export const setAppConfigHasError = (): ResolverAction => {
  return {
    type: 'APP_CONFIG_SET_HAS_ERROR',
    payload: null
  };
}

export const setAppConfig = (data: object): ResolverAction => {
  return {
    type: 'APP_CONFIG_SET_IS_LOADING',
    payload: data
  };
}