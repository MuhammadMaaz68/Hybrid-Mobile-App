import { useContext } from 'react';
import { ScanContext } from '../context/ScanContext';

export default function useScan() {
  return useContext(ScanContext);
}
