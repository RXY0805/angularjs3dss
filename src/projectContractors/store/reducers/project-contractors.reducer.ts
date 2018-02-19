import * as fromProjectContractors from '../actions/project-contractors.action';
import { ProjectContractor } from '../../models/project-contractor.model';

export interface ProjectContractorState {
  entities: { [id: number]: ProjectContractor };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ProjectContractorState = {
  entities: {},
  loaded: false,
  loading: false
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
    case fromProjectContractors.INVITE_CONTRACTORS: {
      return state;
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
