import * as fromProjectContractors from '../actions/project-contractors.action';
import { ProjectContractor } from '../../models/project-contractor.model';
import {
  Contractor,
  ContractorStatus,
  defaultContractorStatus
} from '../../models/contractor.model';
import { Company } from '../../models/company.model';

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
    case fromProjectContractors.INVITE_EXIST_COMPANIES: {
      // const projectInvitation = action.payload;
      // for (let i = 0; i < projectInvitation.existContractIds.length; i++) {}

      // invite existed companies
      return state;
    }
    case fromProjectContractors.INVITE_EXIST_COMPANIES_SUCCESS: {
      const projectId = action.payload.projectId;
      const existedCompanies = action.payload.existCompanies;
      const newContractors = [];

      // const newContractors = [];
      // alert(state.entities[projectId].project.name);
      // console.log(state.entities[projectId].contractors.length);
      const contractsLength = state.entities[projectId].contractors;
      for (let i = 0; i < existedCompanies.length; i++) {
        const newContractor: Contractor = {
          company: existedCompanies[i],
          status: defaultContractorStatus
        };
        newContractors.push(newContractor);
      }
      const result = {
        ...state,
        entities: {
          ...state.entities,
          [projectId]: {
            ...state.entities[projectId],
            contractors: [
              ...(state.entities[projectId].contractors || []).concat(
                newContractors
              )
            ]
          }
        }
      };
      console.log(result);
      return result;
      //console.log(state.entities);
      // return newContractService;
      // console.log(state.entities[projectId].contractors);
      // return newContractService;
      // for (let i = 0; i < existedCompanies.length; i++) {
      // // const newContractor: Contractor = {
      //   company: existedCompanies[i],
      //   status: defaultContractorStatus
      // };
      // console.log(state.entities[projectId]);
      // return {
      //   ...state,
      //   entities: {
      //     ...state.entities,
      //     [projectId]: {
      //       ...state.entities[projectId],
      //       contractors: [
      //         ...state.entities[projectId].contractors,
      //         newContractor
      //       ]
      //     }
      //   }
      // };
      // alert(state.entities[projectId].contractors.length);
      // return addNewContractor;
      // }

      // alert(state.entities[projectId].contractors.length);
      // return state;
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
