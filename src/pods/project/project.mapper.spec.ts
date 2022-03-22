import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('project mapper', () => {
  it('Cuando recibe entrada indefined devuelve objeto vacío', () => {
    //Arrange
    const projectUndefined: apiModel.Project = undefined;
    const modelEmpty = viewModel.createEmptyProject();

    //Act
    const result = mapProjectFromApiToVm(projectUndefined);
    //Assert
    expect(result).toEqual(modelEmpty);
  });

  it('Cuando recibe entrada null devuelve objeto vacío', () => {
    //Arrange
    const projectNull: apiModel.Project = null;
    const modelEmpty = viewModel.createEmptyProject();

    //Act
    const result = mapProjectFromApiToVm(projectNull);
    //Assert
    expect(result).toEqual(modelEmpty);
  });

  it('Devuelve el mismo objeto con employees como array vacío cuando la entrada de employees es undefined', () => {
    //Arrange
    const project: apiModel.Project = {
      id: '2',
      name: 'Félix',
      externalId: '213',
      comments: 'Comentario',
      isActive: true,
      employees: undefined,
    };
    const projectModel: viewModel.Project = {
      ...project,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);
    // Assert
    expect(result).toEqual(projectModel);
  });

  it('Devuelve el mismo objeto con employees como array vacío cuando la entrada de employees es null', () => {
    //Arrange
    const project: apiModel.Project = {
      id: '2',
      name: 'Félix',
      externalId: '213',
      comments: 'Comentario',
      isActive: true,
      employees: null,
    };
    const projectModel: viewModel.Project = {
      ...project,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);
    // Assert
    expect(result).toEqual(projectModel);
  });

  it('Devuelve el mismo objeto completo cuando employee es de tipo EmployeeSummary', () => {
    //Arrange
    const project: apiModel.Project = {
      id: '2',
      name: 'Félix',
      externalId: '213',
      comments: 'Comentario',
      isActive: true,
      employees: [
        {
          employeeName: 'Rodrigo',
          id: '12',
          isAssigned: false,
        },
      ],
    };
    const projectModel: viewModel.Project = {
      ...project,
      employees: [...project.employees],
    };

    // Act
    const result = mapProjectFromApiToVm(project);
    // Assert
    expect(result).toEqual(projectModel);
  });
});
