import { renderHook, act } from '@testing-library/react-hooks';
import { Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog spec', () => {
  it('should return an object: isOpen equals false, itemToDelete with default values, onAccept, onClose and onOpenDialog as a functions when they are called', () => {
    //Arrange

    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    //Assert

    const defaultItemToDelete: Lookup = {
      id: '',
      name: '',
    };
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual(defaultItemToDelete);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update itemToDelete and isOpen when it calls onOpenDialog with item value', () => {
    //Arrange
    const itemWillBeDeleted: Lookup = {
      id: 'Test id',
      name: 'Test Name',
    };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(itemWillBeDeleted);
    });
    //Assert
    expect(result.current.itemToDelete).toEqual(itemWillBeDeleted);
    expect(result.current.isOpen).toEqual(true);
  });
  it('should update isOpen when it calls onClose and isOpen is initialized true', () => {
    //Arrange

    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onClose();
    });
    //Assert
    expect(result.current.isOpen).toEqual(false);
  });
  it('should update itemToDelete when it calls onAccept and itemToDelete is not empty value', () => {
    //Arrange
    const initialValue = {
      id: 'Test id',
      name: 'Test name',
    };
    const setedValue = {
      id: '',
      name: '',
    };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    result.current.itemToDelete = initialValue;
    act(() => {
      result.current.onAccept();
    });
    //Assert
    expect(result.current.itemToDelete).toEqual(setedValue);
  });
});
