import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import { useState } from 'react';

import { TextField } from '..';

type SearchInputProps = {
  label?: string;
  placeholder?: string;
  disableSearchIcon?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  inputValue?: string;
  variant?: TextFieldProps['variant'];
  color?: TextFieldProps['color'];
  size?: TextFieldProps['size'];
};

export const SearchInput = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  options,
  error,
  helperText,
  required,
  inputValue,
  label,
  loading,
  placeholder,
  getOptionLabel,
  disableSearchIcon,
  clearOnBlur = false,
  variant = 'standard',
  color,
  size,
  ...props
}: Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput' | 'open' | 'onOpen' | 'onClose'
> &
  SearchInputProps) => {
  const [open, setOpen] = useState(false);

  function getNoOptionsLabel() {
    if (!inputValue) return 'Digite algo para pesquisar';
    return loading ? 'Carregando...' : 'Nenhum resultado encontrado';
  }

  return (
    <Autocomplete
      id="pesquisa"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      noOptionsText={getNoOptionsLabel()}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          color={color}
          size={size}
          aria-label="pesquisa"
          placeholder={placeholder}
          label={label}
          error={error}
          helperText={helperText}
          required={required}
          value={inputValue}
          InputProps={{
            ...params.InputProps,
            startAdornment: disableSearchIcon ? undefined : (
              <>
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  params.InputProps.endAdornment
                )}
              </>
            ),
          }}
        />
      )}
      getOptionLabel={getOptionLabel}
      clearOnBlur={clearOnBlur}
      {...props}
    />
  );
};
