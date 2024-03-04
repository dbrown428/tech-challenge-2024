import { createContext, useContext, useState } from "react";

export type UserData = {
  username: string
  jobTitle: string
}

/**
 * Could be generalized to store any client data with id lookup.
 * Keeping it simple for now.
 */
type DataStorageActions = {
  setData: (value: UserData) => void
  getData: () => any
  isSignedUp: boolean
  clearData: () => void
}

const DataStorageContext = createContext<DataStorageActions | null>(null)

/** Ideally this DataProvider would not be so tightly coupled to the signup UserData, but to speed things along. */
function DataProvider(props: { children: any }) {
  const [clientData, setClientData] = useState<UserData | undefined>()

  const dataActions: DataStorageActions = {
    setData: (value: UserData) => setClientData(value),
    getData: () => clientData,
    clearData: () => setClientData(undefined),
    isSignedUp: clientData !== undefined,
  }

  return (
    <DataStorageContext.Provider value={dataActions}>
      {props.children}
    </DataStorageContext.Provider>
  )
}

function useApplicationData() {
  const context = useContext(DataStorageContext)
  if (context) {
    return context
  } else {
    throw new Error('useApplicationData must be inside a DataProvider.')
  }
}

export { useApplicationData, DataProvider, DataStorageContext }
