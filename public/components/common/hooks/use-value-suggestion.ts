/*
 * Wazuh app - React hook for getting value suggestions
 * Copyright (C) 2015-2021 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { useEffect, useState } from 'react';
import { getDataPlugin } from '../../../kibana-services';
import { useIndexPattern } from '../hooks';
import { IFieldType, IIndexPattern } from 'src/plugins/data/public';
import {
  UI_ERROR_SEVERITIES,
  UIErrorLog,
  UIErrorSeverity,
  UILogLevel,
} from '../../../react-services/error-orchestrator/types';
import { UI_LOGGER_LEVELS } from '../../../../common/constants';
import { getErrorOrchestrator } from '../../../react-services/common-services';

export interface IValueSuggestion {
  suggestedValues: string[] | boolean[];
  isLoading: boolean;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const useValueSuggestion = (
  filterField: string,
  options?: string[],
  type: 'string' | 'boolean' = 'string'
): IValueSuggestion => {
  const [suggestedValues, setSuggestedValues] = useState<string[] | boolean[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const data = getDataPlugin();
  const indexPattern = useIndexPattern();

  const getValueSuggestions = async (field) => {
    return (
      options ??
      (await data.autocomplete.getValueSuggestions({
        query,
        indexPattern: indexPattern as IIndexPattern,
        field,
      }))
    );
  };

  useEffect(() => {
    if (indexPattern) {
      setIsLoading(true);
      (async () => {
        const field = {
          type: type,
          name: filterField,
          aggregatable: true,
        } as IFieldType;
        try {
          setSuggestedValues(await getValueSuggestions(field));
        } catch (error) {
          const options: UIErrorLog = {
            context: `${useValueSuggestion.name}.getValueSuggestions`,
            level: UI_LOGGER_LEVELS.ERROR as UILogLevel,
            severity: UI_ERROR_SEVERITIES.UI as UIErrorSeverity,
            error: {
              error,
              message: error.message || error,
              title: error.name,
            },
          };
          getErrorOrchestrator().handleError(options);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [indexPattern, query, filterField, type]);

  return { suggestedValues, isLoading, setQuery };
};