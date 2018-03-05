import * as fromProjectContractors from '../actions/project-contractors.action';
import { Contractor } from '../../models/contractor.model';
import { defaultProject } from '../../models/project.model';
import { ProjectContractor } from '../../models/project-contractor.model';
import { Company } from '../../models/company.model';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/distinct';
import { Subscription } from 'rxjs/Subscription';

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

    case fromProjectContractors.UPDATE_CONTRACTOR_SUCCESS: {
      const contractor = action.payload;
      const mainProjectId = contractor.project.mainProjectId;

      return {
        ...state,
        entities: {
          ...state.entities,
          [mainProjectId]: {
            ...state.entities[mainProjectId],
            contractors: [
              ...state.entities[mainProjectId].contractors.map((item, i) => {
                if (item.id !== contractor.id) {
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
      const newCompanyEmail = invitation.email;
      defaultProject.mainProjectId = mainProjectId;

      if (existedCompanies && existedCompanies.length > 0) {
        for (let i = 0; i < existedCompanies.length; i++) {
          const contractor_exist_company: Contractor = {
            id: undefined,
            company: existedCompanies[i],
            project: defaultProject
          };
          newContractors.push(contractor_exist_company);
        }
      } else {
        const newCompany: Company = {
          id: undefined,
          name: undefined,
          email: newCompanyEmail
        };

        const contractor_new_company: Contractor = {
          id: undefined,
          company: newCompany,
          project: defaultProject
        };
        newContractors.push(contractor_new_company);
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
