import * as fromProjectContractors from '../actions/project-contractors.action';
import { Contractor } from '../../models/contractor.model';
import { defaultProject } from '../../models/project.model';
import { ProjectContractor } from '../../models/project-contractor.model';
import { Company } from '../../models/company.model';

export interface ProjectContractorState {
  entities: { [id: number]: ProjectContractor };
  loaded: boolean;
  loading: boolean;
  currentContractorId: number;
}

export const initialState: ProjectContractorState = {
  entities: {},
  loaded: false,
  loading: false,
  currentContractorId: undefined
};

export function reducer(
  state = initialState,
  action: fromProjectContractors.ProjectContractorsAction
): ProjectContractorState {
  switch (action.type) {
    case fromProjectContractors.LOAD_PROJECT_CONTRACTORS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProjectContractors.LOAD_PROJECT_CONTRACTORS_SUCCESS: {
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

    case fromProjectContractors.LOAD_PROJECT_CONTRACTORS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromProjectContractors.SET_CURRENT_CONTRACTOR_ID: {
      return { ...state, currentContractorId: action.payload };
    }

    case fromProjectContractors.UPDATE_CONTRACTOR_SUCCESS: {
      const mainProjectId = action.payload.id;
      const result = {
        ...state,
        entities: {
          ...state.entities,
          [mainProjectId]: {
            ...state.entities[mainProjectId],
            contractors: [
              ...(state.entities[mainProjectId].contractors || [])
                .concat
                // newContractors
                ()
            ]
          }
        }
      };
      return result;

      // return { ...state, currentContractorId: action.payload };
    }

    case fromProjectContractors.INVITE_EXIST_COMPANIES: {
      // const projectInvitation = action.payload;
      // for (let i = 0; i < projectInvitation.existContractIds.length; i++) {}

      // invite existed companies
      return state;
    }
    case fromProjectContractors.INVITE_EXIST_COMPANIES_SUCCESS: {
      const mainProjectId = action.payload.projectId;
      const existedCompanies = action.payload.existCompanies;
      const newContractors = [];

      // const newContractors = [];
      // alert(state.entities[projectId].project.name);
      // console.log(state.entities[projectId].contractors.length);

      for (let i = 0; i < existedCompanies.length; i++) {
        defaultProject.mainProjectId = mainProjectId;
        const newContractor: Contractor = {
          id: undefined,
          company: existedCompanies[i],
          project: defaultProject
        };
        newContractors.push(newContractor);
      }
      const result = {
        ...state,
        entities: {
          ...state.entities,
          [mainProjectId]: {
            ...state.entities[mainProjectId],
            contractors: [
              ...(state.entities[mainProjectId].contractors || []).concat(
                newContractors
              )
            ]
          }
        }
      };
      return result;
    }
  }

  return state;
}

export const getProjectContractorsEntities = (state: ProjectContractorState) =>
  state.entities;
export const getCurrentContractorId = (state: ProjectContractorState) =>
  state.currentContractorId;
export const getProjectContractorsLoading = (state: ProjectContractorState) =>
  state.loading;
export const getProjectContractorsLoaded = (state: ProjectContractorState) =>
  state.loaded;
