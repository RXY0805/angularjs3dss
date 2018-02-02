import * as fromProjectContractors from '../actions/projectContractors.action';
import { ProjectContractor } from '../../models/projectContractor.model';

export interface ProjectContractorState {
  entities: { [id: number]: ProjectContractor };
  loaded: boolean;
  loading: boolean;
  currentProjectId: number;
}

export const initialState: ProjectContractorState = {
  entities: {},
  loaded: false,
  loading: false,
  currentProjectId: undefined
};

export function reducer(
  state = initialState,
  action: fromProjectContractors.ProjectContractorsAction
): ProjectContractorState {
  switch (action.type) {
    case fromProjectContractors.LOAD_PROJECTCONTRACTORS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProjectContractors.LOAD_PROJECTCONTRACTORS_SUCCESS: {
      const projectContractors = action.payload;

      const entities = projectContractors.reduce(
        (
          entities: { [id: number]: ProjectContractor },
          projectContractor: ProjectContractor
        ) => {
          return {
            ...entities,
            [projectContractor.id]: projectContractor
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromProjectContractors.LOAD_PROJECTCONTRACTORS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromProjectContractors.SET_CURRENT_PROJECT_ID: {
      return {
        ...state,
        currentProjectId: action.payload
      };
    }
  }

  return state;
}

export const getProjectContractorsEntities = (state: ProjectContractorState) =>
  state.entities;
export const getProjectContractorsLoading = (state: ProjectContractorState) =>
  state.loading;
export const getProjectContractorsLoaded = (state: ProjectContractorState) =>
  state.loaded;
export const getCurrentProjectId = (state: ProjectContractorState) =>
  state.currentProjectId;
