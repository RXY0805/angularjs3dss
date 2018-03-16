import * as fromProjectContractors from '../actions/project-contractors.action';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/distinct';
import { Subscription } from 'rxjs/Subscription';

import * as fromModels from '../../models';
import {
  ProjectContractor,
  Contractor,
  InvitedContractor
} from '@project-contractors/models';

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
  currentProjectId: 0
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
    case fromProjectContractors.SET_CURRENT_PROJECT_ID: {
      // alert('in reducer' + action.payload);
      return {
        ...state,
        currentProjectId: action.payload
      };
    }

    case fromProjectContractors.LOAD_PROJECT_CONTRACTORS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromProjectContractors.UPDATE_CONTRACTOR_SUCCESS: {
      const contractor = action.payload;
      const mainProjectId = state.currentProjectId;
      return {
        ...state,
        entities: {
          ...state.entities,
          [mainProjectId]: {
            ...state.entities[mainProjectId],
            contractors: [
              ...state.entities[mainProjectId].contractors.map((item, i) => {
                if (item.contractorId !== contractor.contractorId) {
                  return item;
                }
                return {
                  ...item,
                  ...contractor
                };
              })
            ]
          }
        }
      };
    }

    case fromProjectContractors.CREATE_INVITATION_SUCCESS: {
      const invitation = action.payload;
      const mainProjectId = invitation.projectId;
      const existedCompanies = invitation.existCompanies;
      const newContractors = [];

      if (existedCompanies && existedCompanies.length > 0) {
        for (let i = 0; i < existedCompanies.length; i++) {
          const selectedCompany = existedCompanies[i];

          const contractor_exist_company: fromModels.Contractor = {
            ...InvitedContractor,
            companyId: existedCompanies[i].id,
            companyName: existedCompanies[i].name
          };
          newContractors.push(contractor_exist_company);
        }
      } else {
        newContractors.push(InvitedContractor);
      }
      return {
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
