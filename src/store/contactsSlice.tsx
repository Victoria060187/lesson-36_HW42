import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { RootState } from './store';

const contactsAdapter = createEntityAdapter();

interface Contacts {
  id: string;
  name: string;
  surname: string;
  phone: string;
}

export const fetchContactsAsync = createAsyncThunk<Contacts[]>(
  'contacts/fetchContacts',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data: Contacts[] = await response.json();
    return data.slice(0, 7);
  }
);

interface ContactsState extends EntityState<Contacts> {}

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
} = contactsAdapter.getSelectors<RootState>(state => state.contacts);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState() as ContactsState,
  reducers: {
    contactAdded: contactsAdapter.addOne,
    contactRemoved: contactsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactsAsync.fulfilled, (state, action) => {
      contactsAdapter.setAll(state, action.payload);
    });
  },
});

export const { contactAdded, contactRemoved } = contactsSlice.actions;
export default contactsSlice.reducer;