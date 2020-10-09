import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Global } from 'src/app/global';
import { DefaultDAO } from 'src/dao/defaultDAO';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
  private listOrganization: any[] = [];
  private target = "organization";
  public filteredRows: any[] = [];

  constructor(private navCtrl: NavController, private dao: DefaultDAO, private global: Global) {
  }

  goPage(pagina, id) {
    if (id != null) pagina += "/" + id;
    this.navCtrl.navigateForward(pagina, { animated: true });
  }

  async refreshOrganizationList() {
    this.listOrganization = [];
    await this.dao.listAll(this.target).subscribe(value => {
      value.forEach(result => {
        let object = result.data();
        this.listOrganization.push(object);
      });
    });

  }

  async search(event) {
    let value = event.target.value;
    if (!value) {
      this.refreshOrganizationList()
    }
    else {
      let array = [];
      array = this.listOrganization.filter(item => item._corporateName.slice(0, 3).toLowerCase() == value.toLowerCase());

      if (array.length > 0) {
        this.listOrganization = [...array]
      }
    }
  }

  editRegister(item) {
    this.goPage('/pages/register-organization', item._id);
  }

  ionViewWillEnter() {
    this.refreshOrganizationList();
  }

  ngOnInit() {
  }

}
