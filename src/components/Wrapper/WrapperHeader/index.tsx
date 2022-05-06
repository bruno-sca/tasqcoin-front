import { ExpandLess, ExpandMore, Logout } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Avatar, Typography, Menu, MenuItem } from '../..';
import { logo_purple } from '../../../assets/images';
import { useAuth } from '../../../contexts';
import { useDebounceState } from '../../../hooks';
import { services } from '../../../services';
import { SearchInput } from '../../SearchInput';

export const WrapperHeader = () => {
  const {
    data: { user },
    actions: { logout },
  } = useAuth();

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const [inputValue, setInputValue, debouncedInputValue] = useDebounceState('');
  const [options, setOptions] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedInputValue.length === 0) {
      setOptions([]);
      return;
    }
    setLoading(true);
    services.user
      .searchUser(debouncedInputValue)
      .then(({ data }) => setOptions(data))
      .finally(() => setLoading(false));
  }, [debouncedInputValue]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 2px 6px #0000000A',
        px: 3,
        py: 1,
      }}
    >
      <Stack direction="row" alignItems="center">
        <Box
          component="img"
          sx={{
            height: 35,
            width: 35,
            cursor: 'pointer',
          }}
          alt=""
          src={logo_purple}
          onClick={() => setSearchParams({})}
        />
      </Stack>
      <SearchInput
        color="secondary"
        variant="outlined"
        clearOnBlur={false}
        placeholder="Pesquisar colaborador"
        options={options}
        getOptionLabel={(option: UserData) => option.name}
        value={null}
        inputValue={inputValue}
        onChange={(e, newValue: UserData) => {
          setSearchParams({ user: newValue.id });
          setInputValue('');
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        isOptionEqualToValue={(option, val) => option.alias === val.alias}
        filterOptions={(x) => x}
        loading={loading}
        size="small"
        sx={{ width: 300, marginX: 'auto' }}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
      >
        <Typography
          variant="points"
          sx={{ font: 'normal normal bold 13px/20px Roboto' }}
        >
          {user?.name}
        </Typography>
        {anchorEl ? <ExpandLess /> : <ExpandMore />}
        <Avatar src={user?.avatar_url} />
      </Stack>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => logout()}>
          Sair
          <Logout sx={{ ml: 1.5 }} />
        </MenuItem>
      </Menu>
    </Stack>
  );
};
